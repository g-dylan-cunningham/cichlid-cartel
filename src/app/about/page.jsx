import React from 'react';
// import { createBlurb } from '@/modules/prisma/actions';

const About = async () => {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <form>
        <label className='form-control'>
          <div className='label'>
            <span className='label-text'>Blurb</span>
          </div>
          <textarea
            className='textarea textarea-bordered h-24'
            placeholder='Bio'
            name='blurb'
          ></textarea>
        </label>
      </form>
    </main>
  );
};

export default About;
