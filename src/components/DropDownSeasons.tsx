import React from 'react';

const series = {
  id: 1,
  title: 'Family Unit',
  description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
  realese_date: new Date('2024/02/12'),
  image_path: '',
  seasons: [
    {
      id: 1,
      seasonNumber: 1,
      episodes: [
        {
          episode_details: '23 October 2023 - Season 2 - Episode 01',
          next_episode_id: 254,
          series_id: 1,
          season_id: 1,
          id: 253,
          video_id: 125,
          title: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
          description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
              et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
              felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
              consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
              nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
              venenatis vitae, justo.`,
          image_path: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
          video_path: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          likes: 2551,
          dislikes: 5,
          ratings: 4.2,
          realese_date: new Date('2023-05-25'),
          user: {
            id: 1,
            like: true,
            dislike: false,
            rating: 4.9
          }
        },
        // Other episodes omitted for brevity
      ]
    },
    {
      id: 2,
      seasonNumber: 2,
      episodes: [
        // Episodes for season 2 omitted for brevity
      ]
    },
    {
        id: 3,
        seasonNumber: 3,
        episodes: [
          // Episodes for season 2 omitted for brevity
        ]
      }
  ]
};

function DropdownSeasons() {
  const seasonOptions = series.seasons.map(season => (
    <option key={season.id} value={`season${season.seasonNumber}`} className="bg-black text-white">
      {`Season ${season.seasonNumber}`}
    </option>
  ));

  return (
    <section className="relative p-4 flex items-center">
      <select
        name="cars"
        className="bg-dark text-white rounded p-2 border border-white"
        data-select2-id="1"
        aria-hidden="true"
      >
        {seasonOptions}
      </select>
    </section>
  );
}

export default DropdownSeasons;
