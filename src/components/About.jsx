import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function About() {
  const [aboutDesc, setAboutDesc] = useState(
    "I'm a developer with experience building web and mobile applications and integrating data from SharePoint, Dataverse, Office 365 and SQL Server."
  );

  useEffect(() => {
    async function fetchContent() {
      const { data } = await supabase
        .from('content')
        .select('value')
        .eq('key', 'about_desc')
        .single();
      if (data) setAboutDesc(data.value);
    }
    fetchContent();
  }, []);

  return (
    <section className="about" id="about">
      <div className="about-content">
        <h2 className="heading">About <span>Me</span></h2>
        <h3>Full Stack Web Developer & PowerApps Specialist</h3>
        <p>{aboutDesc}</p>
        <a href="#" className="about-btn">Read More</a>
      </div>
    </section>
  );
}
