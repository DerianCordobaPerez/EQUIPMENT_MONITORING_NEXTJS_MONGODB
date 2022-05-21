import Layout from 'components/layout'
import Image from 'next/image'

/**
 * It returns a Layout component with a title, two cards, and a footer
 * @returns a Layout component with a title, a div with two cards and a footer.
 */
export default function Home() {
  return (
    <Layout>
      <h1 className="text-center title__home">Developers</h1>

      <div className="container__cards">
        <div className="cardC shadow">
          <div className="cardC__header">
            <Image
              className="cardC__image"
              src="/img/Derian.jpg"
              alt="User"
              height="70"
              width="70"
            />

            <div className="header__title">
              <h5>Derian Córdoba</h5>
              <span>Back-End Software Developer</span>
            </div>
            <i className="bi bi-quote"></i>
          </div>
          <div className="cardC__body">
            Software Developer, currently working with PHP (Vanilla, Laravel)
            and JavaScript (Vanilla, Node, React, NextJs...). Interested in
            BackEnd development, using technologies such as NodeJs, Laravel,
            Algolia, Next.js..
          </div>
        </div>

        <div className="cardC shadow">
          <div className="cardC__header">
            <Image
              className="cardC__image"
              src="/img/Jonathan.jpg"
              alt="User"
              height="70"
              width="70"
            />

            <div className="header__title">
              <h5>Jonathan Mendoza</h5>
              <span>Front-End Web Developer</span>
            </div>
            <i className="bi bi-quote"></i>
          </div>
          <div className="cardC__body">
            I am a 20-year-old passionate about Front-End web development, a
            fifth-year student of Information Systems Engineering at the
            university UNAN - León.
          </div>
        </div>
      </div>
    </Layout>
  )
}
