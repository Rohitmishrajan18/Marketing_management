import Formulas from './Formulas';
import Frameworks from './Frameworks';
import Definitions from './Definitions';

export default function Review({ subtab, search }) {
  switch (subtab) {
    case 'formulas':
      return <Formulas search={search} />;
    case 'frameworks':
      return <Frameworks search={search} />;
    case 'terms':
      return <Definitions search={search} />;
    default:
      return <Formulas search={search} />;
  }
}