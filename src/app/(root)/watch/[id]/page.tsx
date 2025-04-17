import WatchVideo from "../watch-video";

export async function generateStaticParams() {
  const ids = ['1', '2', '3', '4'];
  return ids.map((id) => ({ id }));
}

export default function WatchPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Watch Page</h1>
      <WatchVideo params={{
        id: "4"
      }} />
    </div>
  );
}

