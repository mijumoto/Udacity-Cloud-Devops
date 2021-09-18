/* eslint react/prop-types: 0 */
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
      <p>I&apos;m a Full-time Quality Assurance Engineer who loves programming and SaaS. I&apos;m passionate about quality and learning. I have many certifications in the field. I have expertise in DevOps, backend development, and some frontend development. QA Skills: Test Automation, CI/CD, DevOps testing, agile testing, and others.</p>
        <table>
          <tbody>
            <tr>
              <td>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/768px-LinkedIn_logo_initials.png" alt="Linkedin" width="25" height="25"></img>
              </td>
              <td>
                <a id="linkedin" href="https://www.linkedin.com/in/mvz">Linkedin</a>
              </td>
            </tr>
            <tr>
              <td>
                <img src="https://image.flaticon.com/icons/png/512/25/25231.png" alt="Github" width="25" height="25"></img>
              </td>
              <td>
                <a id="github" href="https://github.com/mijumoto">Github</a>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href="/posts/[id]" as={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}