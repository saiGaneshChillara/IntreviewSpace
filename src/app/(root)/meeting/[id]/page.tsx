<<<<<<< HEAD
import React from 'react'

function MeetingPage() {
  return (
    <div>
      Meeting page
    </div>
  )
}

export default MeetingPage
=======
"use client";

import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import LoaderUI from '@/components/providers/LoaderUI';
import useGetCallById from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

function MeetingPage() {
  const { id } = useParams();
  const { isLoaded } = useUser();
  const { call, isLoading: isCallLoading } = useGetCallById(id);

  const [isSetupComplete, setIsSetupComplete] =useState(false);
  // const [isCallLoading, ]
  // const isCallLoading = true;

  if (!isLoaded || isCallLoading) return <LoaderUI />;

  if (!call) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-2xl font-semibold">Meeting not found</p>
      </div>
    );
  }
  return (
    <StreamCall call={call}>
      <StreamTheme>
        {!isSetupComplete ? (
          <MeetingSetup onSetupComplete={() => setIsSetupComplete(true)} />
        ) : (
          <MeetingRoom />
        )}
      </StreamTheme>
    </StreamCall>
  );
};

export default MeetingPage;
>>>>>>> a3d2750 (Added meeting setup)
