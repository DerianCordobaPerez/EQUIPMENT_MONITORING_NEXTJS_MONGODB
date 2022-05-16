import { useEffect } from 'react'
import { init } from 'vanilla-tilt'

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
