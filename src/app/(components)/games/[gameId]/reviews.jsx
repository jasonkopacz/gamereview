'use client'
import React from 'react';
import styles from './page.module.css'
import useSWR from 'swr';
import Spinner from '../../Spinner/Spinner';

const fetcher = (...args) => fetch(...args).then((res) => res.json())


export default function Reviews({ params: { gameId } }) {
  const { data, error } = useSWR(`/api/games/${gameId}/reviews`, fetcher)
    if (error) return <div>Something went wrong</div>
    if (!data) return <Spinner />
    
    let game = data.game;
}