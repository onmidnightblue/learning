// http://localhost:3000/
import Head from 'next/head'
import MeetupList from '../components/meetups/MeetupList'
import { MongoClient } from 'mongodb';

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Meetups</title>
        <meta
          name='description'
          content='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus voluptates, doloremque numquam inventore dolorem hic libero labore at atque velit.'
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  )
};

/* 사전 렌더링 */

// getServerSideProps
// page가 요청받을 때마다 호출
// 서버쪽에서 렌더링하는 것이므로 파라미터로 context를 받아 요청 req, 응답 res 변수를 저장해두어야 한다.
// 요청이 들어올 때마다 실행하므로 따로 시간을 지정할 필요가 없음.
// export async function getServerSideProps(context) {
//   const req = context.req
//   const res = context.res

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

// getStaticProps
// 빌드 시 딱 한번 호출, 이후 수정 불가능
// 데이터를 기다리기 위해 추가하는 정해진 이름의 함수
// pages 폴더 안에 있는 파일에서만 작동한다.
// 완료했으면 객체를 반환함
// revalidate > 데이터가 자주 변하는 경우 사용, 숫자 필요. 10을 적으면 서버에서 페이지를 10초마다 다시 생성함을 의미함
export async function getStaticProps() {

  const client = await MongoClient.connect(
    'mongodb+srv://onmidnightblue:9wd9go0K4ecqZF9v@cluster0.lfrakmv.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
