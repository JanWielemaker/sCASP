

p(1,X) :- not q(1,X).
q(1,X) :- not p(1,X).
r(X) :- X .>. 3, X .<. 6, q(1,X).
?- p(1,X), r(Y).



