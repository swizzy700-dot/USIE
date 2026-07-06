'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Play, SkipForward, Copy, AlertCircle, ChevronDown, SkipBack } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { IndustryEngine, GeneratedBatch } from '@/modules/sequential-engine';
import { IndustryType, getIndustryConfig } from '@/modules/search-generator';

export default function Home() {
  const [engine] = useState(() => IndustryEngine.getInstance());
  const [industries, setIndustries] = useState<IndustryType[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType | null>(null);
  const [currentBatch, setCurrentBatch] = useState<GeneratedBatch | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const [individualCopyStatus, setIndividualCopyStatus] = useState<Map<number, 'idle' | 'copied' | 'error'>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBatch, setShowBatch] = useState(false);
  const [batchHistory, setBatchHistory] = useState<GeneratedBatch[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);

  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;
    
    const initializeEngine = async () => {
      // Add timeout to ensure loading is always cleared
      timeoutId = setTimeout(() => {
        if (isMounted) {
          console.error('Engine initialization timeout - forcing loading state clear');
          setIsLoading(false);
          setError('Initialization timeout. Please refresh the page.');
        }
      }, 10000); // 10 second timeout

      try {
        await engine.initialize();
        
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        
        if (isMounted) {
          const availableIndustries = engine.getIndustries();
          setIndustries(availableIndustries);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to initialize engine:', error);
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        if (isMounted) {
          setIsLoading(false);
          setError('Failed to initialize. Please refresh the page.');
        }
      }
    };
    
    initializeEngine();
    
    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [engine]);

  const handleIndustrySelect = useCallback((industryId: IndustryType) => {
    setSelectedIndustry(industryId);
    engine.selectIndustry(industryId);
    setCurrentBatch(null);
    setShowBatch(false);
    setError(null);
    setBatchHistory([]);
    setCurrentHistoryIndex(-1);
  }, [engine]);

  const handleStart = useCallback(async () => {
    if (!selectedIndustry) {
      setError('Please select an industry first');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const batch = await engine.generateBatch();
      setCurrentBatch(batch);
      setShowBatch(true);
      setBatchHistory([batch]);
      setCurrentHistoryIndex(0);
    } catch (error) {
      console.error('Failed to generate batch:', error);
      setError('Failed to generate batch. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [selectedIndustry, engine]);

  const handleNext = useCallback(async () => {
    if (!selectedIndustry) {
      setError('Please select an industry first');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // If we're at the end of history, generate a new batch
      if (currentHistoryIndex === batchHistory.length - 1) {
        // Mark current batch as completed
        await engine.completeCurrentBatch();
        
        // Generate next batch
        const batch = await engine.generateBatch();
        setCurrentBatch(batch);
        
        // Add to history
        setBatchHistory([...batchHistory, batch]);
        setCurrentHistoryIndex(currentHistoryIndex + 1);
      } else {
        // Just move forward in existing history (no regeneration)
        const newIndex = currentHistoryIndex + 1;
        setCurrentHistoryIndex(newIndex);
        setCurrentBatch(batchHistory[newIndex]);
      }
    } catch (error) {
      console.error('Failed to navigate to next batch:', error);
      setError('Failed to navigate to next batch. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [selectedIndustry, engine, batchHistory, currentHistoryIndex]);

  const handleCopy = useCallback(async () => {
    if (!currentBatch) return;

    try {
      const text = currentBatch.queries.join('\n');
      await navigator.clipboard.writeText(text);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (error) {
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  }, [currentBatch]);

  const handleReset = useCallback(() => {
    if (!selectedIndustry) return;
    
    if (confirm('Are you sure you want to reset progress for this industry? This cannot be undone.')) {
      engine.resetIndustryProgress();
      setCurrentBatch(null);
      setShowBatch(false);
      setBatchHistory([]);
      setCurrentHistoryIndex(-1);
    }
  }, [selectedIndustry, engine]);

  const handlePrevious = useCallback(() => {
    if (currentHistoryIndex > 0) {
      const newIndex = currentHistoryIndex - 1;
      setCurrentHistoryIndex(newIndex);
      setCurrentBatch(batchHistory[newIndex]);
    }
  }, [currentHistoryIndex, batchHistory]);

  const handleIndividualCopy = useCallback(async (query: string, index: number) => {
    try {
      await navigator.clipboard.writeText(query);
      setIndividualCopyStatus(prev => new Map(prev).set(index, 'copied'));
      setTimeout(() => {
        setIndividualCopyStatus(prev => {
          const newMap = new Map(prev);
          newMap.set(index, 'idle');
          return newMap;
        });
      }, 2000);
    } catch (error) {
      setIndividualCopyStatus(prev => new Map(prev).set(index, 'error'));
      setTimeout(() => {
        setIndividualCopyStatus(prev => {
          const newMap = new Map(prev);
          newMap.set(index, 'idle');
          return newMap;
        });
      }, 2000);
    }
  }, []);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Initializing...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Industry Selection */}
        <div className="glass rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Industry</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {industries.map((industry) => {
              const config = getIndustryConfig(industry);
              const displayName = config?.name || industry;
              return (
                <button
                  key={industry}
                  onClick={() => handleIndustrySelect(industry)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedIndustry === industry
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <p className="text-sm font-medium">{displayName}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="glass rounded-2xl p-4 shadow-sm bg-red-50 border border-red-200">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Current Batch */}
        {currentBatch && (
          <div className="glass rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{currentBatch.industry}</h2>
                <p className="text-sm text-gray-500">Batch {currentBatch.batchNumber} • {currentBatch.queries.length} search queries</p>
              </div>
              <button
                onClick={() => setShowBatch(!showBatch)}
                className="p-2 rounded-lg hover:bg-white/50 transition-colors"
              >
                <ChevronDown className={`h-5 w-5 text-gray-600 transition-transform ${showBatch ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {showBatch && (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {currentBatch.queries.map((query, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-lg text-sm text-gray-700 font-mono">
                    <span className="flex-1 mr-4">{query}</span>
                    <button
                      onClick={() => handleIndividualCopy(query, index)}
                      disabled={isGenerating}
                      className={`flex items-center gap-1 px-2 py-1 text-xs rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                        individualCopyStatus.get(index) === 'copied' ? 'bg-green-600 text-white' :
                        individualCopyStatus.get(index) === 'error' ? 'bg-red-600 text-white' :
                        'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      <Copy className="h-3 w-3" />
                      {individualCopyStatus.get(index) === 'copied' ? 'Copied!' : 
                       individualCopyStatus.get(index) === 'error' ? 'Error' : 
                       'Copy'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Control Buttons */}
        <div className="glass rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <button
              onClick={handleStart}
              disabled={!selectedIndustry || isGenerating}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              <Play className="h-5 w-5" />
              Start
            </button>
            <button
              onClick={handlePrevious}
              disabled={currentHistoryIndex <= 0 || isGenerating}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              <SkipBack className="h-5 w-5" />
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!selectedIndustry || !currentBatch || isGenerating}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              <SkipForward className="h-5 w-5" />
              Next
            </button>
            <button
              onClick={handleCopy}
              disabled={!currentBatch || isGenerating}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium ${
                copyStatus === 'copied' ? 'bg-green-600 text-white' :
                copyStatus === 'error' ? 'bg-red-600 text-white' :
                'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              <Copy className="h-5 w-5" />
              {copyStatus === 'copied' ? 'Copied!' : copyStatus === 'error' ? 'Error' : 'Copy'}
            </button>
            <button
              onClick={handleReset}
              disabled={!selectedIndustry || isGenerating}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Progress Info */}
        {selectedIndustry && (
          <div className="glass rounded-2xl p-4 shadow-sm">
            <p className="text-sm text-gray-600">
              Progress is automatically saved for each industry. When you return to an industry, it will resume from where you left off.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
