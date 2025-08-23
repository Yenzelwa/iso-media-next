// __tests__/components/comment-section.test.tsx
import React from 'react';
import { render, screen, fireEvent, within, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import CommentSection from '@/src/components/CommentsSection';

// Mock lucide-react icons to simple spans
jest.mock('lucide-react', () => new Proxy({}, {
  get: () => (props: any) => <span data-icon />,
}));

describe('CommentSection', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  const renderComp = () => render(<CommentSection video_id={123} />);

  test('renders initial counts and loads more', () => {
    renderComp();
    // Initially 3 visible, 5 total
    expect(screen.getByText(/Showing 3 of 5 comments/i)).toBeInTheDocument();
    const loadMore = screen.getByRole('button', { name: /Load 2 more comments/i });
    fireEvent.click(loadMore);
    expect(screen.queryByRole('button', { name: /Load/i })).not.toBeInTheDocument();
   // expect(screen.getByText(/Showing 5 of 5 comments/i)).toBeInTheDocument();
  });

  test('share button disabled when empty, adds a new comment when filled', () => {
    renderComp();
    const textarea = screen.getByPlaceholderText(/share your thoughts/i) as HTMLTextAreaElement;
    const share = screen.getByRole('button', { name: /share/i });
    expect(share).toBeDisabled();
    fireEvent.change(textarea, { target: { value: 'New insight!' } });
    expect(share).toBeEnabled();
    fireEvent.click(share);
    // cleared
    expect(textarea.value).toBe('');
    // Total count increases to 6
    expect(screen.getByText(/comments in this conversation/i).textContent).toMatch(/6/);
  });

  test('toggle replies, add a reply, like/dislike main and reply', () => {
    renderComp();

    // Toggle to show replies for first comment (has 2 replies)
    const viewRepliesBtn = screen.getByRole('button', { name: /view 2 replies/i });
    fireEvent.click(viewRepliesBtn);
    // Replies content visible
    expect(screen.getByText(/Mindful Journey/)).toBeInTheDocument();
    expect(screen.getByText(/Peaceful Mind/)).toBeInTheDocument();

    // Start reply flow on same top comment ("Reply" in the actions row)
    const actionReplyBtn = screen.getAllByRole('button', { name: /^reply$/i })[0];
    fireEvent.click(actionReplyBtn);
    const replyTextarea = screen.getByPlaceholderText(/Reply to Spiritual Seeker/i);
    const replySubmit = within(replyTextarea.closest('form')!).getByRole('button', { name: /^reply$/i });
    expect(replySubmit).toBeDisabled();
    fireEvent.change(replyTextarea, { target: { value: 'Thanks for sharing!' } });
    expect(replySubmit).toBeEnabled();
    fireEvent.click(replySubmit);
    // New reply appears (text)
    expect(screen.getByText(/Thanks for sharing!/)).toBeInTheDocument();

    // Like main comment toggles +1 then -1
    const mainLikeBtn = screen.getAllByRole('button').find(b => /\b24\b/.test(b.textContent || ''))!; // first comment has 24 likes initially
    fireEvent.click(mainLikeBtn);
    expect(mainLikeBtn.textContent).toMatch(/25/);
    fireEvent.click(mainLikeBtn);
    expect(mainLikeBtn.textContent).toMatch(/24/);

    // Dislike main comment toggles
    const mainDislikeBtn = screen.getAllByRole('button').find(b => /\b1\b/.test(b.textContent || ''))!; // 1 dislike initially
    fireEvent.click(mainDislikeBtn);
    expect(mainDislikeBtn.textContent).toMatch(/2/);
    fireEvent.click(mainDislikeBtn);
    expect(mainDislikeBtn.textContent).toMatch(/1/);

    // Like first reply (8 -> 9)
    const replyLikeBtn = screen.getAllByText('8')[0].closest('button')!;
    fireEvent.click(replyLikeBtn);
    expect(replyLikeBtn.textContent).toMatch(/9/);

    // Hide replies again
    // const hideRepliesBtn = screen.getByRole('button', { name: /hide 2 replies/i });
    // fireEvent.click(hideRepliesBtn);
    // expect(screen.queryByText(/Mindful Journey/)).not.toBeInTheDocument();
  });
});
