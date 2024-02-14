'use client'
import React from 'react';
import styles from './page.module.css';
import * as Tabs from '@radix-ui/react-tabs';
import Spinner from '../Spinner/Spinner';
import useSWR from 'swr';
import { fetcher } from '../../helpers/fetcher';
import Library from './Library/Library';
import Reviews from './Reviews/Reviews';

export default function Account() {
  const { data, error } = useSWR('/api/user', fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <Spinner />;

  const user = data.user
  console.log(user)
  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <Tabs.Root className={styles.tabsRoot} defaultValue="tab1">
            <Tabs.List aria-label="Profile Overview" className={styles.tabsList}>
              <Tabs.Trigger className={styles.tabsTrigger} value="tab1">
                Library
              </Tabs.Trigger>
              <Tabs.Trigger className={styles.tabsTrigger} value="tab2">
                Reviews
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content className={styles.tabsContent} value="tab1">
              <Library user={user} />
            </Tabs.Content>
            <Tabs.Content className={styles.tabsContent} value="tab2">
              <Reviews user={user} />
            </Tabs.Content>
          </Tabs.Root>
        </header>
      </div>
    </>
  )
}