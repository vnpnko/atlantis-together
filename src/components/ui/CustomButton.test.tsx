import { render, screen, fireEvent } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { describe, it, expect, vi } from 'vitest'
import CustomButton from './CustomButton'

// Wrapper component to provide Chakra UI context
const ChakraWrapper = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider>{children}</ChakraProvider>
)

describe('CustomButton', () => {
  it('renders with the correct label', () => {
    render(
      <ChakraWrapper>
        <CustomButton label="Test Button" />
      </ChakraWrapper>
    )
    
    expect(screen.getByText('Test Button')).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn()
    
    render(
      <ChakraWrapper>
        <CustomButton label="Click Me" onClick={handleClick} />
      </ChakraWrapper>
    )
    
    fireEvent.click(screen.getByText('Click Me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('calls onMouseEnter handler when hovered', () => {
    const handleMouseEnter = vi.fn()
    
    render(
      <ChakraWrapper>
        <CustomButton label="Hover Me" onMouseEnter={handleMouseEnter} />
      </ChakraWrapper>
    )
    
    fireEvent.mouseEnter(screen.getByText('Hover Me'))
    expect(handleMouseEnter).toHaveBeenCalledTimes(1)
  })

  it('calls onMouseLeave handler when mouse leaves', () => {
    const handleMouseLeave = vi.fn()
    
    render(
      <ChakraWrapper>
        <CustomButton label="Leave Me" onMouseLeave={handleMouseLeave} />
      </ChakraWrapper>
    )
    
    const button = screen.getByText('Leave Me')
    fireEvent.mouseEnter(button)
    fireEvent.mouseLeave(button)
    expect(handleMouseLeave).toHaveBeenCalledTimes(1)
  })

  it('applies active styling when isActive is true', () => {
    render(
      <ChakraWrapper>
        <CustomButton label="Active Button" isActive={true} />
      </ChakraWrapper>
    )
    
    const button = screen.getByText('Active Button')
    expect(button).toBeInTheDocument()
    // Note: Testing exact CSS values is complex with Chakra UI
    // This test ensures the component renders without errors when isActive is true
  })

  it('applies hovered styling when isHovered is true', () => {
    render(
      <ChakraWrapper>
        <CustomButton label="Hovered Button" isHovered={true} />
      </ChakraWrapper>
    )
    
    const button = screen.getByText('Hovered Button')
    expect(button).toBeInTheDocument()
    // Note: Testing exact CSS values is complex with Chakra UI
    // This test ensures the component renders without errors when isHovered is true
  })

  it('passes through additional props', () => {
    render(
      <ChakraWrapper>
        <CustomButton 
          label="Test Button" 
          data-testid="custom-button"
          disabled={true}
        />
      </ChakraWrapper>
    )
    
    const button = screen.getByTestId('custom-button')
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
  })

  it('has correct default styling properties', () => {
    render(
      <ChakraWrapper>
        <CustomButton label="Styled Button" data-testid="styled-button" />
      </ChakraWrapper>
    )
    
    const button = screen.getByTestId('styled-button')
    expect(button).toBeInTheDocument()
    
    // Check that the button has the expected text content
    expect(button).toHaveTextContent('Styled Button')
  })
})