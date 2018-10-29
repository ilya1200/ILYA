with departments_with_10m_budget as (
select did
from department natural join dbudget
where byear between extract(year from current_date)-1 and extract(year from current_date)
group by did
having sum(budget)>10000000),

dept_avg_salary(did,avg_salary) as(
select did,avg(salary)
from departments_with_10m_budget natural join employee
where salary is not null
group by did
)

select did,avg_salary
from dept_avg_salary
where avg_salary >= all(select avg_salary from dept_avg_salary);