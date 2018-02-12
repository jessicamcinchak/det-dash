const metrics = [
  {
    title: 'Building Permits',
    key: 'permits',
    label: 'Number of permits issued: ',
    dateCol: 'permit_issued',
    params: '$select=count(permit_issued)',
    resKey: 'count_permit_issued',
    source: 'https://data.detroitmi.gov/resource/but4-ky7y'
  },
  {
    title: 'Improve Detroit',
    key: 'scf',
    label: 'Number of issues submitted: ',
    dateCol: 'created_at',
    params: '$select=count(created_at)',
    resKey: 'count_created_at',
    source: 'https://data.detroitmi.gov/resource/a9kb-mhiu'
  },
  {
    title: '911 Calls for Service',
    key: 'cad',
    label: 'Average total response time (in minutes): ',
    dateCol: 'call_timestamp',
    params: '$select=avg(totalresponsetime)',
    resKey: 'avg_total_response_time',
    source: 'https://data.detroitmi.gov/resource/dvu3-6qvr'
  },
  {
    title: 'Demolitions',
    key: 'demo',
    label: 'Number of residential knock-downs: ',
    dateCol: 'demolition_date',
    params: '$select=count(demolition_date)',
    resKey: 'count_demolition_date',
    source: 'https://data.detroitmi.gov/resource/uzpg-2pfj'
  },
  {
    title: 'Blight Violations',
    key: 'bvn',
    label: 'Number of tickets issued: ',
    dateCol: 'violation_date',
    params: '$select=count(violation_date)',
    resKey: 'count_violation_date',
    source: 'https://data.detroitmi.gov/resource/s7hj-n86v'
  }
];

export default metrics;
