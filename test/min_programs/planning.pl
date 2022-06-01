% based on https://swish.swi-prolog.org/p/PLP_planificacion.pl
% by J. Alonso

%:- use_module(library(clpq)).

% tasks(+LTD) se verifica si LTD es la lista de los pares de las tasks
% y sus duraciones con el formato T/D.
tasks([t1/5,t2/7,t3/10,t4/2,t5/9]).
%tasks([t1/5,t2/7,t3/2]).

% before(+T1,+T2) se verifica si la tarea T1 tiene que preceder a la
% T2.
before(t1,t2).
before(t1,t4).
before(t2,t3).
before(t4,t5).

% planning(P,TP) se verifica si P es el plan (esto es una lista de
% elementos de la forma tarea/inicio/duración) para realizar las tasks
% en el menor tiempo posible, TP. Por ejemplo,
%    ?- planning(P,TP).
%    P = [t1/0/5,t2/5/7,t3/12/10,t4/_20034/2,t5/_20052/9],
%    TP = 22,
%    {_20084= -6-_20098-_20092,_20098+_20092>= -6,_20092=<0,_20052=13+_20098,
%     _20098=<0,_20034=11+_20098+_20092,_20186= -9+_20098+_20092} 
%    
%    ?- planning([_/I1/_, _/I2/_, _/I3/_, _/I4/_, _/I5/_],TP).
%    I1 = 0,
%    I2 = 5,
%    I3 = 12,
%    TP = 22,
%    {_27474= -6-_27488-_27482,_27488+_27482>= -6,_27482=<0,I5=13+_27488,
%     _27488=<0,I4=11+_27488+_27482,_27576= -9+_27488+_27482} 
planning(P,TP) :-
    tasks(LTD),
    constraints(LTD,P,TP). 

% constraints(LTD,P,TP) se verifica si P es un plan para realizar las
% tasks de LTD cumpliendo las constraints definidas por precedencia/2
% y TP es el tiempo que se necesita para ejecutar el plan P. 
constraints([],[],_TP).
constraints([T/D | RLTD],[T/I/D | RTID],TP) :-
   I #>= 0, I + D #=< TP, 
   constraints(RLTD,RTID,TP),
   constraints_aux(T/I/D,RTID).

% constraints_aux(TID,LTID) se verifica si el triple
% tarea-inicio-duración TID es consistente con la lista de triples
% tarea-inicio-duración LTID. 
constraints_aux(_,[]).
constraints_aux(T/I/D, [T1/I1/D1 | RTID]) :-
    before(T, T1),
    I+D #=< I1,
    constraints_aux(T/I/D,RTID).

constraints_aux(T/I/D, [T1/I1/D1 | RTID]) :-
    before(T1,T),
    I1+D1 #=< I,
    constraints_aux(T/I/D,RTID).

constraints_aux(T/I/D, [T1/I1/D1 | RTID]) :-
    not before(T1,T),
    not before(T,T1), 
    constraints_aux(T/I/D,RTID).

% ?-  planning([_/I1/_, _/I2/_, _/I3/_],TP).
?- planning([_/I1/_, _/I2/_, _/I3/_, _/I4/_, _/I5/_],TP).