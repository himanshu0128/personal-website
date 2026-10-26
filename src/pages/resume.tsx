import React from 'react';
import { graphql, HeadFC, PageProps } from 'gatsby';

import Layout from 'components/Layout';
import Seo from 'components/Seo';
import SectionHeading from 'components/SectionHeading';
import Timeline from 'components/Timeline';
import { byMostRecent } from 'utils/dates';

const ResumePage: React.FC<PageProps<Queries.ResumePageQuery>> = ({ data }) => {
  const experience = data.experiences.nodes
    .map((node) => ({
      id: node.id,
      html: node.html,
      title: node.frontmatter!.company!,
      subtitle: node.frontmatter!.position!,
      startDate: node.frontmatter!.startDate!,
      endDate: node.frontmatter!.endDate!
    }))
    .sort(byMostRecent);

  const education = data.education.nodes
    .map((node) => ({
      id: node.id,
      html: node.html,
      title: node.frontmatter!.university!,
      subtitle: node.frontmatter!.degree!,
      startDate: node.frontmatter!.startDate!,
      endDate: node.frontmatter!.endDate!
    }))
    .sort(byMostRecent);

  const skills = data.skills?.frontmatter;

  return (
    <Layout>
      <div className="container-page pt-12 sm:pt-20">
        <SectionHeading
          as="h1"
          eyebrow="Resume"
          title="Experience & education"
          description="A snapshot of where I've worked, what I've studied and the tools I reach for."
        />
      </div>

      <section className="container-page mt-16">
        <h2 className="mb-8 text-sm font-semibold uppercase tracking-widest !text-zinc-500">
          {data.experienceSection?.frontmatter?.subtitle || 'Experience'}
        </h2>
        <Timeline items={experience} />
      </section>

      <section className="container-page mt-12">
        <h2 className="mb-8 text-sm font-semibold uppercase tracking-widest !text-zinc-500">
          {data.educationSection?.frontmatter?.title || 'Education'}
        </h2>
        <Timeline items={education} />
      </section>

      {skills && (
        <section className="container-page mt-12">
          <h2 className="mb-8 text-sm font-semibold uppercase tracking-widest !text-zinc-500">{skills.title}</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {skills.groups?.map(
              (group) =>
                group && (
                  <div key={group.name} className="card p-6">
                    <h3 className="font-semibold tracking-tight">{group.name}</h3>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {group.items?.map((skill) => skill && <li key={skill} className="chip">{skill}</li>)}
                    </ul>
                  </div>
                )
            )}
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ResumePage;

export const Head: HeadFC = () => (
  <Seo title="Resume" description="Work experience, education and skills of Himanshu Gupta, full stack developer." />
);

export const query = graphql`
  query ResumePage {
    experienceSection: markdownRemark(frontmatter: { category: { eq: "experiences section" } }) {
      frontmatter {
        title
        subtitle
      }
    }
    experiences: allMarkdownRemark(filter: { frontmatter: { category: { eq: "experiences" } } }) {
      nodes {
        id
        html
        frontmatter {
          company
          position
          startDate
          endDate
        }
      }
    }
    educationSection: markdownRemark(frontmatter: { category: { eq: "education section" } }) {
      frontmatter {
        title
      }
    }
    education: allMarkdownRemark(filter: { frontmatter: { category: { eq: "education" } } }) {
      nodes {
        id
        html
        frontmatter {
          university
          degree
          startDate
          endDate
        }
      }
    }
    skills: markdownRemark(frontmatter: { category: { eq: "skills section" } }) {
      frontmatter {
        title
        groups {
          name
          items
        }
      }
    }
  }
`;
