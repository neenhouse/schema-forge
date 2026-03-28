import { useState } from 'react';
import { mockReviews } from '@/lib/mock-data';
import type { Review, ReviewStatus, ReviewComment } from '@/lib/types';
import './TeamReviewPage.css';

const statusLabels: Record<ReviewStatus, string> = {
  open: 'Open',
  changes_requested: 'Changes Requested',
  approved: 'Approved',
  merged: 'Merged',
};

const statusClasses: Record<ReviewStatus, string> = {
  open: 'status-open',
  changes_requested: 'status-changes',
  approved: 'status-approved',
  merged: 'status-merged',
};

export default function TeamReviewPage() {
  const [reviews] = useState<Review[]>(mockReviews);
  const [selectedReview, setSelectedReview] = useState<Review>(reviews[0]);
  const [newComment, setNewComment] = useState('');
  const [localComments, setLocalComments] = useState<ReviewComment[]>([]);

  const allComments = [...selectedReview.comments, ...localComments.filter(c => c.id.startsWith(selectedReview.id))];

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    const comment: ReviewComment = {
      id: `${selectedReview.id}-local-${Date.now()}`,
      author: 'You',
      content: newComment.trim(),
      createdAt: new Date().toISOString(),
    };
    setLocalComments(prev => [...prev, comment]);
    setNewComment('');
  };

  const handleApprove = () => {
    // In a real app this would update the backend
    const comment: ReviewComment = {
      id: `${selectedReview.id}-approve-${Date.now()}`,
      author: 'You',
      content: 'Approved. LGTM!',
      createdAt: new Date().toISOString(),
    };
    setLocalComments(prev => [...prev, comment]);
  };

  const handleRequestChanges = () => {
    if (!newComment.trim()) return;
    const comment: ReviewComment = {
      id: `${selectedReview.id}-changes-${Date.now()}`,
      author: 'You',
      content: `[Changes Requested] ${newComment.trim()}`,
      createdAt: new Date().toISOString(),
    };
    setLocalComments(prev => [...prev, comment]);
    setNewComment('');
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="reviews-page">
      <div className="page-header">
        <div>
          <h2>Team Reviews</h2>
          <p className="page-subtitle">Assign reviewer, approve/reject schema changes with comments</p>
        </div>
        <div className="review-filters">
          <span className="filter-count">{reviews.length} reviews</span>
        </div>
      </div>

      <div className="reviews-layout">
        <div className="reviews-list">
          <div className="section-label">Schema Reviews</div>
          {reviews.map(review => (
            <button
              key={review.id}
              className={`review-item ${selectedReview.id === review.id ? 'active' : ''}`}
              onClick={() => setSelectedReview(review)}
            >
              <div className="review-item-top">
                <span className="review-item-title">{review.title}</span>
                <span className={`review-status ${statusClasses[review.status]}`}>
                  {statusLabels[review.status]}
                </span>
              </div>
              <p className="review-item-desc">{review.description}</p>
              <div className="review-item-meta">
                <span className="review-item-author">{review.author}</span>
                <span className="review-item-arrow">{'\u2192'}</span>
                <span className="review-item-reviewer">{review.reviewer}</span>
                <span className="review-item-comments">{review.comments.length} comments</span>
              </div>
            </button>
          ))}
        </div>

        <div className="review-detail">
          <div className="review-detail-header">
            <div className="review-detail-title-row">
              <h3>{selectedReview.title}</h3>
              <span className={`review-status ${statusClasses[selectedReview.status]}`}>
                {statusLabels[selectedReview.status]}
              </span>
            </div>
            <p className="review-detail-desc">{selectedReview.description}</p>
            <div className="review-participants">
              <div className="participant">
                <span className="participant-label">Author</span>
                <span className="participant-name">{selectedReview.author}</span>
              </div>
              <div className="participant">
                <span className="participant-label">Reviewer</span>
                <span className="participant-name">{selectedReview.reviewer}</span>
              </div>
              <div className="participant">
                <span className="participant-label">Created</span>
                <span className="participant-name">{formatDate(selectedReview.createdAt)}</span>
              </div>
              <div className="participant">
                <span className="participant-label">Updated</span>
                <span className="participant-name">{formatDate(selectedReview.updatedAt)}</span>
              </div>
            </div>
          </div>

          <div className="review-comments">
            <div className="section-label">Discussion ({allComments.length})</div>
            {allComments.map(comment => (
              <div key={comment.id} className="comment-card">
                <div className="comment-header">
                  <span className="comment-avatar">
                    {comment.author.charAt(0).toUpperCase()}
                  </span>
                  <span className="comment-author">{comment.author}</span>
                  <span className="comment-date">{formatDate(comment.createdAt)}</span>
                  {comment.target && (
                    <span className="comment-target">
                      {comment.target.table}{comment.target.column ? `.${comment.target.column}` : ''}
                    </span>
                  )}
                </div>
                <p className="comment-body">{comment.content}</p>
              </div>
            ))}
          </div>

          <div className="review-compose">
            <textarea
              className="compose-input"
              placeholder="Add a comment..."
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              rows={3}
            />
            <div className="compose-actions">
              <button className="btn-comment" onClick={handleSubmitComment}>
                Comment
              </button>
              <button className="btn-approve" onClick={handleApprove}>
                Approve
              </button>
              <button
                className="btn-request-changes"
                onClick={handleRequestChanges}
                disabled={!newComment.trim()}
              >
                Request Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
