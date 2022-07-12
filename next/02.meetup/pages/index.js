// .com/

import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "first meetup",
    image:
      "http://maple9192.cafe24.com/pages/upload/board/m212/1612/08/20161208_90f7ae95eaf027825f6b7b6c00f1e6ec.jpg",
    address: "address 5, 12345 city",
    description: "first meetup",
  },
  {
    id: "m2",
    title: "seconed meetup",
    image:
      "http://maple9192.cafe24.com/pages/upload/board/m212/1612/08/20161208_90f7ae95eaf027825f6b7b6c00f1e6ec.jpg",
    address: "address 10, 12345 city",
    description: "second meetup",
  },
];

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

export function getStaticProps() {
  // fetch

  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
    revalidate: 10
  };
}

export default HomePage;
