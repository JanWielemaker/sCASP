
escape_inflation(a, Initial_Savings, Expected_Savings) :-
    Salary #= 2400,
    Basic_Expenses #= 1650,
    Other_Expenses #= 500,
    Prob_Extra_Income #= 1/2,
    Extra_Income #= 500,
    Utility #= Prob_Extra_Income*Extra_Income,
    Expected_Savings #= Salary + Utility + Initial_Savings - Basic_Expenses*1.10 - Other_Expenses*1.3.

escape_inflation(b, Initial_Savings, Expected_Savings) :-
    Salary #= 2400,
    Basic_Expenses #= 1650,
    Other_Expenses #= 500,
    Prob_Acq_Durables #= 1,
    Prob_Sale #= 1,
    FairPrice #= Initial_Savings*1.3,
    Utility #= Prob_Acq_Durables*Prob_Sale*(FairPrice-Initial_Savings),
    Expected_Savings #= Salary + Utility - Basic_Expenses*1.10 - Other_Expenses*1.3.

best_plan(plan_a, Initial_Savings) :-
    escape_inflation(a, Initial_Savings, Expected_Savings_1),
    escape_inflation(b, Initial_Savings, Expected_Savings_2),
    Expected_Savings_1 #>= Expected_Savings_2,
    Expected_Savings_1 #>= Initial_Savings*1.3. 

best_plan(plan_b, Initial_Savings) :-
    escape_inflation(a, Initial_Savings, Expected_Savings_1),
    escape_inflation(b, Initial_Savings, Expected_Savings_2),
    Expected_Savings_2 #>= Expected_Savings_1,
    Expected_Savings_2 #>= Initial_Savings*1.3.     
 
?- best_plan(Plan, 610). 