import { render, screen } from '@testing-library/react';
import ShowCard from '../src/components/ShowCard';
import { Show } from '../src/types';
import '@testing-library/jest-dom';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt as string} />;
  },
}));

const mockShow: Show = {
  id: 'test-show',
  title: 'Test Movie',
  genre: ['Action', 'Adventure'],
  year: 2023,
  type: 'movie',
  streamingServices: ['netflix'],
  popularity: 8,
  imdbRating: 7.5,
  description: 'A test movie for unit testing',
  imageUrl: 'https://example.com/poster.jpg'
};

describe('ShowCard Component', () => {
  it('renders show title and basic information', () => {
    render(<ShowCard show={mockShow} isSelected={false} />);
    
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('2023 • Action, Adventure')).toBeInTheDocument();
    expect(screen.getByText('🎬 Movie')).toBeInTheDocument();
    expect(screen.getByText('⭐ 7.5')).toBeInTheDocument();
  });

  it('shows placeholder when no image URL is provided', () => {
    const showWithoutImage = { ...mockShow, imageUrl: undefined };
    render(<ShowCard show={showWithoutImage} isSelected={false} />);
    
    expect(screen.getByText('🎬')).toBeInTheDocument();
    expect(screen.getByText('Movie')).toBeInTheDocument();
  });

  it('renders in compact mode', () => {
    render(<ShowCard show={mockShow} compact={true} isSelected={false} />);
    
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    // In compact mode, description should not be visible
    expect(screen.queryByText('A test movie for unit testing')).not.toBeInTheDocument();
  });

  it('shows selection state correctly', () => {
    render(<ShowCard show={mockShow} isSelected={true} onToggle={() => {}} />);
    
    expect(screen.getByTitle('Remove from selection')).toBeInTheDocument();
    expect(screen.getByText('✓')).toBeInTheDocument();
  });
});
