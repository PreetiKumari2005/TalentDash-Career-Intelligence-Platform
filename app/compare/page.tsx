// 
import { MOCK_SALARIES } from '../../lib/mockdata'
import { CompareClient } from '../../components/features/CompareClient'

export default function ComparePage() {
  return <CompareClient salaries={MOCK_SALARIES} />
}