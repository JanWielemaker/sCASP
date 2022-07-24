% object(1).
% object(2).
% object(3).

% set(S) :- forall(X, (object(X), not(excluded(X,S)))).

% excluded(X,S) :- object(X), not(member(X,S)).

% member(X1, [X2|_]) :- X1 #= X2.
% member(X, [_|R]) :- member(X, R).

% ?- set(S).

object(1).
object(2).
object(3).

set(S) :- not excluded(_X,S).

excluded(X,S) :- not member(X,S).

member(X1, [X2|_]) :- object(X1), object(X2), X1 = X2. 
member(X, [_|R]) :- member(X, R). 


?- set(X).
