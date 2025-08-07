'use client';

import React from 'react';
import CourseTabs from '../../components/course-tabs';

export default function CoursesPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <CourseTabs />
    </main>
  );
}
