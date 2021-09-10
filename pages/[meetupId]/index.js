import { MongoClient, ObjectId } from 'mongodb';
import React, { Fragment } from 'react';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import Head from 'next/head';
const MeetupDetailPage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description}></meta>
      </Head>

      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://jrsgacusan:inlovedwidjuel17@cluster0.9fu8h.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  //fetch data for single meetup
  const meetupId = context.params.meetupId;
  //Mongo db
  const client = await MongoClient.connect(
    'mongodb+srv://jrsgacusan:inlovedwidjuel17@cluster0.9fu8h.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
  client.close();

  console.log(meetup);
  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
      },
    },
  };
}

export default MeetupDetailPage;
