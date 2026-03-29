import ProblemGuide from './ProblemGuide';
import CaseStudies from './CaseStudies';

export default function Practice({ subtab, search }) {
  switch (subtab) {
    case 'problems':
      return <ProblemGuide search={search} />;
    case 'cases':
      return <CaseStudies search={search} />;
    default:
      return <ProblemGuide search={search} />;
  }
}