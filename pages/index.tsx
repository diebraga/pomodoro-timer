import { CompletedChalanges } from "../components/CompletedChalanges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import styles from "../styles/pages/Home.module.css"
import Head from "next/head"
import { GetServerSideProps } from "next"
import { Chalangebox } from "../components/Challengebox";
import { CountDownProvider } from '../contexts/CountdownContex'
import { ChallangeProvider } from '../contexts/ChallengeContext'

interface HomeProps {
  level: number
  currentExperience: number
  challangeCompleted: number
}

export default function Home(props: HomeProps) {

  return (
    <ChallangeProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challangeCompleted={props.challangeCompleted}
    >

        <div className={styles.container}>
        <Head>
          <title>Home | Moveit</title>
        </Head>
        <ExperienceBar />

        <CountDownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChalanges />
              <Countdown />
            </div>

            <div>
              <Chalangebox />
            </div>
          </section>
        </CountDownProvider>
      </div>

    </ChallangeProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challangeCompleted } = ctx.req.cookies
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challangeCompleted: Number(challangeCompleted)
    }
  }
} 