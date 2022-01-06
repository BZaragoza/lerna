import React from 'react';

import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';


export default function App() {
    return (
      <>
        <Navigation
            // you can use your own router's api to get pathname
            activeItemId="/management/members"
            className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"
            onSelect={({itemId}) => {
              // maybe push to the route
            }}
            items={[
              {
                title: 'Dashboard',
                itemId: '/dashboard',
                // you can use your own custom Icon component as well
                // icon is optional
                elemBefore: () => <p>Hola</p>,
              },
              {
                title: 'Management',
                itemId: '/management',
                elemBefore: () => <p>Hola</p>,
                subNav: [
                  {
                    title: 'Projects',
                    itemId: '/management/projects',
                    elemBefore: () => <p>Hola</p>,
                  },
                  {
                    title: 'Members',
                    itemId: '/management/members',
                    elemBefore: () => <p>Hola</p>,
                  },
                ],
              },
              {
                title: 'Another Item',
                itemId: '/another',
                subNav: [
                  {
                    title: 'Teams',
                    itemId: '/management/teams',
                  },
                ],
              },
            ]}
          />
      </>
    );
}