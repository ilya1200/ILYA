select pid,did,byear,project.budget
from project INNER JOIN dbudget  using (did)
where extract('year' from project.ddate) = dbudget.byear AND
	project.budget >= 0.5*dbudget.budget
;
