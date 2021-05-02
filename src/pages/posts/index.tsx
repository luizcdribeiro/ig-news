import { GetStaticProps } from 'next'
import Head from 'next/head'
import Prismic from '@prismicio/client'
import { getPrismicClient } from '../../services/prismic'
import styles from './styles.module.scss'

export default function Posts() {
  return (

    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>02 de Maio de 2021</time>
            <strong>Mapas com React usando Leaflet</strong>
            <p>Leaflet é uma biblioteca JavaScript open-source para trabalhar com Mapas em aplicações web e mobile. Pode ser simplesmente integrada a um site usando apenas HTML, CSS e JavaScript.</p>
          </a>
          <a href="#">
            <time>02 de Maio de 2021</time>
            <strong>Mapas com React usando Leaflet</strong>
            <p>Leaflet é uma biblioteca JavaScript open-source para trabalhar com Mapas em aplicações web e mobile. Pode ser simplesmente integrada a um site usando apenas HTML, CSS e JavaScript.</p>
          </a>
          <a href="#">
            <time>02 de Maio de 2021</time>
            <strong>Mapas com React usando Leaflet</strong>
            <p>Leaflet é uma biblioteca JavaScript open-source para trabalhar com Mapas em aplicações web e mobile. Pode ser simplesmente integrada a um site usando apenas HTML, CSS e JavaScript.</p>
          </a>
        </div>
      </main>
    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient ();

  const response = await prismic.query(
    [
      Prismic.predicates.at('document.type', 'publication')
    ], {
      fetch: ['publication.title', 'publication.content'],
      pageSize: 100,
    }
  )

  console.log(JSON.stringify(response, null, 2))

  return {
    props: {

    }
  }
}