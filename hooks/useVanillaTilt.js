import { useEffect } from 'react'
import { init } from 'vanilla-tilt'

/**
 * It takes an element as a prop and uses the useEffect hook to initialize the vanilla-tilt library on
 * all elements that match the element prop
 * @returns null
 */
export function useVanillaTilt({ element }) {
  useEffect(() => {
    const boxs = document.querySelectorAll(element)
    boxs.forEach((box) =>
      init(box, {
        max: 10,
        speed: 100,
        glare: true,
        'max-glare': 1,
      }),
    )
  })

  return null
}
