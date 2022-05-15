import Layout from 'components/layout'
import Image from 'next/image'

export default function Home() {
  return (
    <Layout>
      <h1 class="text-center title__home">Developers</h1>

      <div class="container__cards">
        <div class="cardC shadow">
          <div class="cardC__header">
            <Image
              className="cardC__image"
              src="/img/Derian.jpg"
              alt="User"
              height="70"
              width="70"
            />

            <div class="header__title">
              <h5>Derian Córdoba</h5>
              <span>Back-End Software Developer</span>
            </div>
            <i class="bi bi-quote"></i>
          </div>
          <div class="cardC__body">
            Software Developer, currently working with PHP (Vanilla, Laravel)
            and JavaScript (Vanilla, Node, React, NextJs...). Interested in
            BackEnd development, using technologies such as NodeJs, Laravel,
            Algolia, Next.js..
          </div>
        </div>

        <div class="cardC shadow">
          <div class="cardC__header">
            <Image
              className="cardC__image"
              src="/img/Jonathan.jpg"
              alt="User"
              height="70"
              width="70"
            />

            <div class="header__title">
              <h5>Jonathan Mendoza</h5>
              <span>Front-End Web Developer</span>
            </div>
            <i class="bi bi-quote"></i>
          </div>
          <div class="cardC__body">
            I am a 20-year-old passionate about Front-End web development, a
            fifth-year student of Information Systems Engineering at the
            university UNAN - León.
          </div>
        </div>
      </div>
    </Layout>
  )
}
