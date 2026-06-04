import React from 'react';
import { InvitationLanding } from '@settleone/design-system';

export const JoinDeal = () => {
  const handleJoin = () => {
    console.log('User joining transaction...');
    // Redirect to onboarding/login
  };

  return (
    <InvitationLanding 
      senderName="AlphaDev Solutions"
      amount="5,000"
      currency="USDC"
      dealTitle="Website Redesign & Frontend Development"
      onJoin={handleJoin}
    />
  );
};
