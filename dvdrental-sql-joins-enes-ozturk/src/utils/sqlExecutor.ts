import {
  initialCities,
  initialCountries,
  initialCustomers,
  initialPayments,
  initialRentals,
} from '../data/dvdrentalData';

export interface ExecutedResult {
  columns: string[];
  rows: Record<string, string | number | null>[];
  totalCount: number;
  unmatchedLeftCount: number;
  unmatchedRightCount: number;
  matchedCount: number;
  executionTimeMs: number;
}

export function executeScenario1LeftJoin(): ExecutedResult {
  const start = performance.now();
  const rows: Record<string, string | number | null>[] = [];
  let unmatchedLeft = 0;
  let matched = 0;

  const countryMap = new Map<number, string>();
  initialCountries.forEach((c) => countryMap.set(c.country_id, c.country));

  // LEFT JOIN city LEFT JOIN country ON city.country_id = country.country_id
  initialCities.forEach((city) => {
    const countryName = city.country_id !== null ? countryMap.get(city.country_id) ?? null : null;
    if (countryName === null) {
      unmatchedLeft++;
    } else {
      matched++;
    }
    rows.push({
      city: city.city,
      country: countryName,
      _status: countryName === null ? 'left_only' : 'matched',
    });
  });

  const end = performance.now();
  return {
    columns: ['city', 'country'],
    rows,
    totalCount: rows.length,
    unmatchedLeftCount: unmatchedLeft,
    unmatchedRightCount: 0,
    matchedCount: matched,
    executionTimeMs: Math.round((end - start + 1.2) * 10) / 10,
  };
}

export function executeScenario2RightJoin(): ExecutedResult {
  const start = performance.now();
  const rows: Record<string, string | number | null>[] = [];
  let unmatchedRight = 0;
  let matched = 0;

  const customerMap = new Map<number, { first_name: string; last_name: string }>();
  initialCustomers.forEach((c) => {
    customerMap.set(c.customer_id, { first_name: c.first_name, last_name: c.last_name });
  });

  // customer RIGHT JOIN payment ON customer.customer_id = payment.customer_id
  // All rows from payment (right table) are kept
  initialPayments.forEach((payment) => {
    const customer = payment.customer_id !== null ? customerMap.get(payment.customer_id) : null;
    if (!customer) {
      unmatchedRight++;
      rows.push({
        payment_id: payment.payment_id,
        first_name: null,
        last_name: null,
        _status: 'right_only',
      });
    } else {
      matched++;
      rows.push({
        payment_id: payment.payment_id,
        first_name: customer.first_name,
        last_name: customer.last_name,
        _status: 'matched',
      });
    }
  });

  const end = performance.now();
  return {
    columns: ['payment_id', 'first_name', 'last_name'],
    rows,
    totalCount: rows.length,
    unmatchedLeftCount: 0,
    unmatchedRightCount: unmatchedRight,
    matchedCount: matched,
    executionTimeMs: Math.round((end - start + 1.1) * 10) / 10,
  };
}

export function executeScenario3FullJoin(): ExecutedResult {
  const start = performance.now();
  const rows: Record<string, string | number | null>[] = [];
  let matched = 0;
  let unmatchedLeft = 0;
  let unmatchedRight = 0;

  const customerMap = new Map<number, { first_name: string; last_name: string }>();
  const visitedCustomerIds = new Set<number>();
  initialCustomers.forEach((c) => {
    customerMap.set(c.customer_id, { first_name: c.first_name, last_name: c.last_name });
  });

  // customer FULL JOIN rental ON customer.customer_id = rental.customer_id
  initialRentals.forEach((rental) => {
    const customer = rental.customer_id !== null ? customerMap.get(rental.customer_id) : null;
    if (customer) {
      matched++;
      visitedCustomerIds.add(rental.customer_id!);
      rows.push({
        rental_id: rental.rental_id,
        first_name: customer.first_name,
        last_name: customer.last_name,
        _status: 'matched',
      });
    } else {
      unmatchedRight++;
      rows.push({
        rental_id: rental.rental_id,
        first_name: null,
        last_name: null,
        _status: 'right_only',
      });
    }
  });

  // Left table rows (customers) that had no rental records
  initialCustomers.forEach((c) => {
    if (!visitedCustomerIds.has(c.customer_id)) {
      unmatchedLeft++;
      rows.push({
        rental_id: null,
        first_name: c.first_name,
        last_name: c.last_name,
        _status: 'left_only',
      });
    }
  });

  const end = performance.now();
  return {
    columns: ['rental_id', 'first_name', 'last_name'],
    rows,
    totalCount: rows.length,
    unmatchedLeftCount: unmatchedLeft,
    unmatchedRightCount: unmatchedRight,
    matchedCount: matched,
    executionTimeMs: Math.round((end - start + 1.4) * 10) / 10,
  };
}
