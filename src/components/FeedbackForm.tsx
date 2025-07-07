'use client';

import { useState, useRef } from 'react';

interface FeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackForm({ isOpen, onClose }: FeedbackFormProps) {
  const [formData, setFormData] = useState({
    usability: '',
    recommendations: '',
    missingContent: '',
    bugs: '',
    wouldUse: '',
    feedback: '',
    email: '',
    screenshot: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, screenshot: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      
      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'screenshot' && value instanceof File) {
          formDataToSend.append(key, value);
        } else if (typeof value === 'string') {
          formDataToSend.append(key, value);
        }
      });

      // Add timestamp and user agent for context
      formDataToSend.append('timestamp', new Date().toISOString());
      formDataToSend.append('userAgent', navigator.userAgent);
      formDataToSend.append('url', window.location.href);

      // Submit to Formspree (replace YOUR_FORM_ID with your actual Formspree form ID)
      // Get your form ID from https://formspree.io/ after creating a form
      const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'YOUR_FORM_ID';
      
      if (FORMSPREE_ID === 'YOUR_FORM_ID') {
        // Fallback: show alert with form data for now
        const feedbackText = `
Usability: ${formData.usability}/5
Recommendations: ${formData.recommendations}
Missing Content: ${formData.missingContent}
Bugs: ${formData.bugs}
Would Use: ${formData.wouldUse}
Feedback: ${formData.feedback}
Email: ${formData.email}
        `.trim();
        
        alert(`Feedback form not configured yet. Here's what would be sent:\n\n${feedbackText}\n\nPlease see FEEDBACK_SETUP.md for configuration instructions.`);
        setSubmitted(true);
        setTimeout(() => {
          onClose();
          setSubmitted(false);
          setFormData({
            usability: '',
            recommendations: '',
            missingContent: '',
            bugs: '',
            wouldUse: '',
            feedback: '',
            email: '',
            screenshot: null
          });
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }, 2000);
        return;
      }

      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          onClose();
          setSubmitted(false);
          setFormData({
            usability: '',
            recommendations: '',
            missingContent: '',
            bugs: '',
            wouldUse: '',
            feedback: '',
            email: '',
            screenshot: null
          });
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }, 2000);
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              📝 Help Us Improve StreamSearch
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {submitted ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Thank you for your feedback!
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We appreciate you taking the time to help us improve StreamSearch.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Usability Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  How easy was it to use? (1-5 scale) *
                </label>
                <select
                  name="usability"
                  value={formData.usability}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select rating...</option>
                  <option value="1">1 - Very difficult</option>
                  <option value="2">2 - Somewhat difficult</option>
                  <option value="3">3 - Neutral</option>
                  <option value="4">4 - Easy</option>
                  <option value="5">5 - Very easy</option>
                </select>
              </div>

              {/* Recommendations */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Did the recommendations make sense? *
                </label>
                <select
                  name="recommendations"
                  value={formData.recommendations}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select answer...</option>
                  <option value="yes">Yes, they were helpful</option>
                  <option value="mostly">Mostly, with some issues</option>
                  <option value="no">No, they didn&apos;t make sense</option>
                  <option value="unclear">I&apos;m not sure</option>
                </select>
              </div>

              {/* Missing Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What shows/services are missing that you&apos;d like to see?
                </label>
                <textarea
                  name="missingContent"
                  value={formData.missingContent}
                  onChange={handleInputChange}
                  placeholder="e.g., HBO's Barry, Apple TV+'s Ted Lasso, Crunchyroll for anime..."
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  rows={3}
                />
              </div>

              {/* Bugs/Issues */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Any bugs or confusing parts?
                </label>
                <textarea
                  name="bugs"
                  value={formData.bugs}
                  onChange={handleInputChange}
                  placeholder="Describe any issues you encountered..."
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  rows={3}
                />
              </div>

              {/* Would Use */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Would you actually use this to choose streaming services? *
                </label>
                <select
                  name="wouldUse"
                  value={formData.wouldUse}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select answer...</option>
                  <option value="definitely">Definitely!</option>
                  <option value="probably">Probably</option>
                  <option value="maybe">Maybe</option>
                  <option value="probably-not">Probably not</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Open Feedback */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Any other feedback or suggestions?
                </label>
                <textarea
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleInputChange}
                  placeholder="Share any other thoughts, ideas, or feedback..."
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  rows={4}
                />
              </div>

              {/* Email (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email (optional - for follow-up questions)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Screenshot Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Screenshot (optional - to show issues or suggestions)
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                {formData.screenshot && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Selected: {formData.screenshot.name}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Sending...' : 'Send Feedback'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
