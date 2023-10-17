import { Metadata } from 'next';
import React from 'react';
import BrowseSlideShow from '../components/BrowseSlideShow';

export const metadata: Metadata = {
    title: 'isolakwamuntu content ',
    description: 'Browse all categories',
  }
const BrowsePage = () => {
    return (
        <>
        <BrowseSlideShow/>
        </>
    )
}
export default BrowsePage;