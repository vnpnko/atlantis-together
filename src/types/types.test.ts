import { describe, it, expect } from 'vitest'
import type { GlobeLocation, GlobeArc } from './types'

describe('Types', () => {
  describe('GlobeLocation', () => {
    it('should accept valid GlobeLocation object', () => {
      const validLocation: GlobeLocation = {
        label: 'Test Location',
        episode: 1,
        lat: 40.7128,
        lng: -74.0060,
        url: 'http://example.com',
        source: 'http://source.com'
      }

      expect(validLocation.label).toBe('Test Location')
      expect(validLocation.episode).toBe(1)
      expect(validLocation.lat).toBe(40.7128)
      expect(validLocation.lng).toBe(-74.0060)
      expect(validLocation.url).toBe('http://example.com')
      expect(validLocation.source).toBe('http://source.com')
    })

    it('should have all required properties', () => {
      const location: GlobeLocation = {
        label: 'New York',
        episode: 2,
        lat: 40.7128,
        lng: -74.0060,
        url: 'http://localhost:5173/?scene=NewYork',
        source: 'http://source.com'
      }

      // Check that all properties exist
      expect(typeof location.label).toBe('string')
      expect(typeof location.episode).toBe('number')
      expect(typeof location.lat).toBe('number')
      expect(typeof location.lng).toBe('number')
      expect(typeof location.url).toBe('string')
      expect(typeof location.source).toBe('string')
    })
  })

  describe('GlobeArc', () => {
    it('should accept valid GlobeArc object', () => {
      const validArc: GlobeArc = {
        startLat: 40.7128,
        startLng: -74.0060,
        endLat: 51.5074,
        endLng: -0.1278,
        color: '#ff0000'
      }

      expect(validArc.startLat).toBe(40.7128)
      expect(validArc.startLng).toBe(-74.0060)
      expect(validArc.endLat).toBe(51.5074)
      expect(validArc.endLng).toBe(-0.1278)
      expect(validArc.color).toBe('#ff0000')
    })

    it('should have all required coordinate properties', () => {
      const arc: GlobeArc = {
        startLat: 0,
        startLng: 0,
        endLat: 10,
        endLng: 10,
        color: 'blue'
      }

      // Check that all coordinate properties are numbers
      expect(typeof arc.startLat).toBe('number')
      expect(typeof arc.startLng).toBe('number')
      expect(typeof arc.endLat).toBe('number')
      expect(typeof arc.endLng).toBe('number')
      expect(typeof arc.color).toBe('string')
    })

    it('should accept different color formats', () => {
      const hexArc: GlobeArc = {
        startLat: 0, startLng: 0, endLat: 1, endLng: 1,
        color: '#ffffff'
      }

      const namedArc: GlobeArc = {
        startLat: 0, startLng: 0, endLat: 1, endLng: 1,
        color: 'red'
      }

      const rgbArc: GlobeArc = {
        startLat: 0, startLng: 0, endLat: 1, endLng: 1,
        color: 'rgb(255, 0, 0)'
      }

      expect(hexArc.color).toBe('#ffffff')
      expect(namedArc.color).toBe('red')
      expect(rgbArc.color).toBe('rgb(255, 0, 0)')
    })
  })
})