# javascript-clean-code

We are going to establish some basic rules of clean code, what to follow and what indicates bad practice. 
Many of the examples we will show are perfectly valid code and the reason why we consider it bad practice is not the 
code itself but the bigger picture. We are software engineers developing robust applications which need to be future 
proof so while a solutions is perfectly good for showcasing in 1 testing file, it may not be acceptable 
within a real project. 

The advices we give are not bulletproofs but in some cases they don't apply but for than 1% of cases being consistent 
is a lot better choice. 

The rules and advices we introduce will force you to think about your solution a lot more and if you enforce them 
they will force you to create good quality code even when you are under time pressure, in a moment of laziness or are 
just not able to see the benefit in that moment. All the rules and advices are gathered from seasoned software engineers
with more than 10 years of experience. In many cases the lack of experience is a reason for not seeing the 
consequences of your actions and this can lead to failed projects.

The rules we introduce start the bear fruit in mid to large, enterprise projects but it is good to follow them even 
in small apps where the quality of the code is not of high importance.

We will introduce some rules and advices and provide you with concrete code examples and explanation of differences 
and benefits.

Keep in mind that many rules will benefit you once you are working on a team, have to write lot of tests and have to 
ensure that everyone can clearly understand your solution and <b><i>intentions</i></b>.

### Rules

1. Avoid the use the let keyword
2. Maximum 1 level of nesting
3. No else or if else blocks
4. Prefer early return
5. Declarative over imperative
6. SRP, SOLID, DRY, KISS, YAGNI, JIT...
7. Be functional but not too much :)
8. Prefer arrow functions for context binding
9. Create modules and packages for helpers and utilities
10. Refactor code all the time
11. Organise your code in strict folder structures 
12. README file for every module, feature
13. Use Airbnb's linter
14. Write tests and aim for 100% test coverage
