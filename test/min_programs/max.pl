% max(X) :- forall(Y , (num(X ),num(Y), not (X #=< Y))).

% num(1).
% num(2).

% ?- max(2). 

max(X) :- num(X), num(Y), X\=Y, not greater(Y,X). 

greater(X,Y) :- not bigger_or_equal(Y,X).

bigger_or_equal(X,Y) :- X>=Y.

num(1).
num(2).


?- max(X).



