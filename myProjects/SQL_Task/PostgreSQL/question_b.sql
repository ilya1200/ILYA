create or replace function trigf1() returns trigger as $$
begin
	if new.pid in 
	(select project.pid 
	from project 
	where project.pid=new.pid and project.ddate<current_date)
	then raise notice 'The project you want to assign is already over.';
	return null;
	end if;
	
	if 
	(select count(*)
	from onproject natural join project 
	where onproject.eid=new.eid and new.fdate<=project.ddate)>=3
	then raise notice 'The employee already has 3 projects to work on.';
	return null;
	end if;	
	 
	return new;
end;
$$ language plpgsql;

create trigger T1 before insert on onproject
for each row 
execute procedure trigf1();

