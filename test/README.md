
## Testing sCASP

The following command tests the sCASP code in that file `family.pl`, located in the `test/programs` dir as seen from where the swipl is had being invoked: 

    swipl test/test_scasp.pl --cov=dir test/programs/family.pl

From the same standpoint down, after the command is executed, the directory `dir` will contain a set of `.cov` files which correspond to each of the sCASP modules source code, but annotated with tags on the left side that indicate how many times that clause has been successfully called, how many failures, and so on. For instance, for module `solve.pl`, one gets (in `solve.pl.cov`):

    29 ++1      solve(M:Goals, StackIn, StackOut, Model) :-
    30 ++1          stack_parents(StackIn, Parents),
    31 ++1          stack_proved(StackIn, ProvedIn),
    32 ++1          solve(Goals, M, Parents, ProvedIn, _ProvedOout, StackIn, StackOut, Model).

which means that the solve/4 clause has been called exactly once and so with each of its conditions, and that one call was successful. 

As referred by the [README](../README.md) above, the general usage of the command is explained here: 

    %!  main(+Argv)
    %
    %   Usage: swipl test_scasp.pl [option ...] [dir ...] [file ...]
    %
    %   Options:
    %
    %     |----------------|---------------------------------------|
    %     | -q             | Only run the _quick_ tests            |
    %     | --timeout=Secs | Run tests with timeout (default 60)   |
    %     | --passed       | Only run tests that have a .pass file |
    %     | --save         | Save result if no .pass file exists   |
    %     | --overwrite    | Overwrite .pass after we passed       |
    %     | --pass         | Overwrite .pass after we failed       |
    %     | --cov=Dir      | Dump coverage data in Dir             |
    %     | --cov-by-test  | Get coverage information by test      |
    %     | --cov-module=M | Module to analyse for --cov-by-test   |


But the command above also produces a useful output table with a summary of coverage, success and failure, for each source file involved, but only when all tests (in this case only one file to test) have passed: 

    swipl test/test_scasp.pl --cov=dir test/programs/family.pl
    family.pl ..................................  1 models 1676 ms
    All tests passed!

    ==============================================================================
                                Coverage by File                               
    ==============================================================================
    File                                                     Clauses    %Cov %Fail
    ==============================================================================
    /home/jacinto/git/sCASP/test/test_scasp.pl                    79    13.9   1.3
    /usr/local/lib/swipl/library/apply.pl                         75    28.0   0.0
    /usr/local/lib/swipl/library/lists.pl                        111     6.3   0.0
    /usr/local/lib/swipl/library/option.pl                        45     8.9   6.7
    /usr/local/lib/swipl/library/test_cover.pl                    93     1.1   1.1
    ...share/swi-prolog/pack/scasp/prolog/scasp/compile.pl        22    40.9   9.1
    /usr/local/lib/swipl/library/error.pl                         90     1.1   0.0
    /usr/local/lib/swipl/library/prolog_code.pl                   64     6.2   3.1
    ...re/swi-prolog/pack/scasp/prolog/scasp/predicates.pl        32    21.9   3.1
    .../share/swi-prolog/pack/scasp/prolog/scasp/common.pl        55    41.8   7.3
    ...share/swi-prolog/pack/scasp/prolog/scasp/program.pl        30    76.7   3.3
    ...are/swi-prolog/pack/scasp/prolog/scasp/variables.pl        21   100.0  19.0
    /usr/local/lib/swipl/library/assoc.pl                        103    30.1   1.0
    ...l/share/swi-prolog/pack/scasp/prolog/scasp/input.pl        63    57.1  14.3
    ...re/swi-prolog/pack/scasp/prolog/scasp/comp_duals.pl        57    49.1   7.0
    ...are/swi-prolog/pack/scasp/prolog/scasp/nmr_check.pl        52    75.0   9.6
    ...re/swi-prolog/pack/scasp/prolog/scasp/call_graph.pl        23    87.0   0.0
    ...hare/swi-prolog/pack/scasp/prolog/scasp/pr_rules.pl        78    41.0   6.4
    ...share/swi-prolog/pack/scasp/prolog/scasp/modules.pl        21    52.4  23.8
    ...l/share/swi-prolog/pack/scasp/prolog/scasp/solve.pl       142    59.2  14.1
    ...i-prolog/pack/scasp/prolog/scasp/clp/disequality.pl        29    75.9   6.9
    /usr/local/lib/swipl/library/ordsets.pl                       90     4.4   0.0
    ...share/swi-prolog/pack/scasp/prolog/scasp/verbose.pl        24    25.0  12.5
    /usr/local/lib/swipl/library/clp/clpqr/dump.pl                28    39.3   0.0
    /usr/local/lib/swipl/library/clp/clpqr/ordering.pl            28    14.3  10.7
    /usr/local/lib/swipl/library/clp/clpqr/itf.pl                 14     7.1   7.1
    /usr/local/lib/swipl/library/clp/clpqr/geler.pl               18     5.6   0.0
    /usr/local/lib/swipl/library/clp/clpqr/project.pl             36     8.3   0.0
    ...hare/swi-prolog/pack/scasp/prolog/scasp/clp/clpq.pl        56     7.1   3.6
    .../share/swi-prolog/pack/scasp/prolog/scasp/output.pl        66    21.2   1.5
    /usr/local/lib/swipl/library/terms.pl                         53     1.9   1.9
    ...l/share/swi-prolog/pack/scasp/prolog/scasp/stack.pl        44    38.6   2.3
    ...l/share/swi-prolog/pack/scasp/prolog/scasp/model.pl        29    44.8  10.3
    /usr/local/lib/swipl/library/pairs.pl                         21    47.6   0.0
    ==============================================================================


Therefore (to be continued):

swipl test/test_scasp.pl -- --assume --nmr --dcc --cov=./dir test/programs/

swipl test/test_scasp.pl -- --assume --dcc --cov=./dir test/programs/

swipl test/test_scasp.pl -- --assume --nmr --dcc --cov=./dir test/programs/

swipl test/test_scasp.pl -- --assume --nmr --dcc  --olon --cov=./dir test/programs/

swipl test/test_scasp.pl -- --assume --olon --cov=./dir test/programs/

swipl test/test_scasp.pl -- --assume --trace_dcc --nmr --dcc  --olon --cov=./dir test/programs/


