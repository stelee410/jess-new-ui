import Chat from '@/components/chat';

export default async function ChatPage({
    params,
  }: {
    params: Promise<{
      profileName: string;
      locale: string;
    }>
  }) {
      const {profileName} = await params;
      const decodedProfileName = decodeURIComponent(profileName);
      
      return <Chat profileName={decodedProfileName} />;
}