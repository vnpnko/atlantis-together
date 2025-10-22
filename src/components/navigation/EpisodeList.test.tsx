import { render, screen, fireEvent } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { EpisodeList } from './EpisodeList'

// Mock the locations data
vi.mock('../../assets/data/locations.json', () => ({
  default: [
    {
      label: 'Budapest',
      episode: 1,
      lat: 47.4979120,
      lng: 19.0402350,
      url: 'http://localhost:5173/?scene=Budapest',
      source: 'https://lumalabs.ai/capture/71dd63ee-ab2b-473b-a57b-b51bc8020b24'
    },
    {
      label: 'Lefkada',
      episode: 2,
      lat: 38.43,
      lng: 20.39,
      url: 'http://localhost:5173/?scene=Lefkada',
      source: 'https://lumalabs.ai/capture/b7a45371-3e4c-4e3b-87aa-b038d387ae2c'
    },
    {
      label: 'Athens',
      episode: 4,
      lat: 37.5903,
      lng: 23.4341,
      url: 'http://localhost:5173/?scene=Athens',
      source: 'https://lumalabs.ai/capture/b7a45371-3e4c-4e3b-87aa-b038d387ae2c'
    }
  ]
}))

// Mock react-router-dom
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Wrapper component to provide necessary contexts
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <ChakraProvider>{children}</ChakraProvider>
  </BrowserRouter>
)

describe('EpisodeList', () => {
  const defaultProps = {
    current: null,
    hovered: null,
    setHovered: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all episodes from the locations data', () => {
    render(
      <TestWrapper>
        <EpisodeList {...defaultProps} />
      </TestWrapper>
    )

    expect(screen.getByText('Budapest')).toBeInTheDocument()
    expect(screen.getByText('Lefkada')).toBeInTheDocument()
    expect(screen.getByText('Athens')).toBeInTheDocument()
  })

  it('highlights the current episode', () => {
    render(
      <TestWrapper>
        <EpisodeList {...defaultProps} current="Budapest" />
      </TestWrapper>
    )

    const budapestButton = screen.getByText('Budapest')
    expect(budapestButton).toBeInTheDocument()
    // The button should be rendered (active state is handled by CustomButton component)
  })

  it('calls setHovered when mouse enters a button', () => {
    const setHovered = vi.fn()
    
    render(
      <TestWrapper>
        <EpisodeList {...defaultProps} setHovered={setHovered} />
      </TestWrapper>
    )

    fireEvent.mouseEnter(screen.getByText('Budapest'))
    expect(setHovered).toHaveBeenCalledWith('Budapest')
  })

  it('calls setHovered with null when mouse leaves a button', () => {
    const setHovered = vi.fn()
    
    render(
      <TestWrapper>
        <EpisodeList {...defaultProps} setHovered={setHovered} />
      </TestWrapper>
    )

    const button = screen.getByText('Budapest')
    fireEvent.mouseLeave(button)
    expect(setHovered).toHaveBeenCalledWith(null)
  })

  it('navigates to correct scene when episode is clicked', () => {
    render(
      <TestWrapper>
        <EpisodeList {...defaultProps} />
      </TestWrapper>
    )

    fireEvent.click(screen.getByText('Budapest'))
    expect(mockNavigate).toHaveBeenCalledWith('/?scene=Budapest')
  })

  it('navigates to different scenes for different episodes', () => {
    render(
      <TestWrapper>
        <EpisodeList {...defaultProps} />
      </TestWrapper>
    )

    fireEvent.click(screen.getByText('Lefkada'))
    expect(mockNavigate).toHaveBeenCalledWith('/?scene=Lefkada')

    fireEvent.click(screen.getByText('Athens'))
    expect(mockNavigate).toHaveBeenCalledWith('/?scene=Athens')
  })

  it('shows hovered state for the correct episode', () => {
    render(
      <TestWrapper>
        <EpisodeList {...defaultProps} hovered="Lefkada" />
      </TestWrapper>
    )

    // The component should render without errors when hovered state is set
    expect(screen.getByText('Lefkada')).toBeInTheDocument()
    expect(screen.getByText('Budapest')).toBeInTheDocument()
    expect(screen.getByText('Athens')).toBeInTheDocument()
  })

  it('handles both current and hovered states simultaneously', () => {
    render(
      <TestWrapper>
        <EpisodeList {...defaultProps} current="Budapest" hovered="Lefkada" />
      </TestWrapper>
    )

    expect(screen.getByText('Budapest')).toBeInTheDocument()
    expect(screen.getByText('Lefkada')).toBeInTheDocument()
    expect(screen.getByText('Athens')).toBeInTheDocument()
  })

  it('renders buttons with correct props', () => {
    const setHovered = vi.fn()
    
    render(
      <TestWrapper>
        <EpisodeList 
          current="Budapest" 
          hovered="Lefkada" 
          setHovered={setHovered} 
        />
      </TestWrapper>
    )

    // Test that all buttons are rendered and interactive
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(3)

    // Test interaction with one button
    fireEvent.click(buttons[0])
    expect(mockNavigate).toHaveBeenCalled()
  })
})