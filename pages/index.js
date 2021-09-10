import React, { Fragment } from 'react';
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import MeetupItem from '../components/meetups/MeetupItem';
import Head from 'next/head';
const HomePage = ({ meetups }) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a meetups list.">
          {' '}
        </meta>
      </Head>
      <MeetupList meetups={meetups}></MeetupList>
    </Fragment>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    'mongodb+srv://jrsgacusan:inlovedwidjuel17@cluster0.9fu8h.mongodb.net/meetups?retryWrites=true&w=majority'
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
    revalidate: 10,
  };
}

export default HomePage;
