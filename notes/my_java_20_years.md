---
sidebar: false
---

# 我与编程语言：写在 Java 20 年之际

不知不觉Java问世已经20年了。毕竟是搞Java开发出身的程序员，回想起来还是有些许感慨。我还清楚得记得当初学习Java时还在讲“5.0新特性”，也清楚的记得那一版代号叫“Tiger”。09年IBM和Oracle争着从Sun收购Java的时候，也曾担心它在Oracle手中活不长。

 写此文，算是借着对Java的缅怀，总结下自己写代码的这几年。

 从五年级毕业的那年暑假学Foxbase开始，让我与编程结缘，那年计算机二级证的获取流程是：报名－交钱－等着发证。之后初中自学Foxpro，念大学时学C语言、C\#，再然后工作到现在，学Java，写bash shell script，写JavaScript，走马观花地学Ruby；Python女神出来炒作的时候学Python玩，又粗略地学PHP、浏览Thinkphp框架的设计结构；到了13年底，觉得自己缺少对系统级语言的掌握，于是开始认真、系统地学了Golang。

 记得09年在上海，收到的第一份面试通知是C++游戏开发。那时觉得自己想做的是Java，只有Java才是未来与方向，而且我也不懂C++，于是没去。仿佛选择了编程语言就像选择了政党，以后再想换阵营是要杀头的。直至学习Golang的过程中，我才意识到————

 一门编程语言的好坏，在于它有没有带给你思考。

 C语言曾带给我思考。“八后”、“背包”，一个main函数就是全部。究竟是"int main"还是"void main"，争论起来也是美好的。C语言让我学到了基本的思考逻辑，毕竟之前我并不会用Foxbase写for输出九九乘法表。这个时期，我读了《the c programming language》、《pointers on c》。

 Java曾带给我思考。学习Java最大的收获是学习设计模式。这让我懂得“代码原来还可以这么写“。Java也算是用心学过的语言，RMI、多线程、NIO、动态字节码，几乎各个层面的东西也多少有些接触及实践。学习一门语言通常不算难，几天、几个月都有可能，然而融入其背后的社区是漫长的过程。学习Java平台最大的痛苦是，当我需要一个切实有效的解决方案，通常我需要做的是找一堆框架，选出一个切实有效的。绝大多数做Java的人，做的都是苦力活。幸运些的人可以整合框架，再幸运些的整合平台。也有人出于无聊、虚荣抑或学习的目的，无价值地封装已有的框架。最幸运的人，可以改造或实现自己的框架。这些年，看着Java从被人诟病性能差，到它渗透至各个领域，心情竟是莫明的欣喜夹杂着泛泛忧伤。因为Java已经让我感觉麻木，总是提不起兴趣。除了臃肿，我心里很难浮现出什么合适的词汇来形容它。尽管它还很优秀，却已露出落寞的端倪。

 伴随着Java一直在学习的语言是JavaScript。它被混入IE的支持特性而学习，后来它真的像一门语言了，却一直难以摆脱IE的困扰。Ajax、V8，Google两次无意地救了JS。JavaScript可以算我用的最舒服的语言，然而并没有太深的感情。用JavaScript最大的乐趣是可以玩虐它。不像Java，它有着更多的缺陷，更多的陷阱以及不成文的编码约定。同时它又更灵活，有着更强的表达能力。

 Go语言带给我思考。对Go的思考是基于和Java的比较，它更务实，设计的更充分。尽管Go并没有太多新鲜的概念，比如接口基于鸭子类型的定义，在Python、JS这类语言中不少使用，然而Go的接口定义方式却引发了我对Java类系统的思考，以及面向对象实现方式的思考。Go给我带来的思考点很多，不一而足。它的亮点是语言级支持goroutine，可惜我并没有什么实质性的Go语言开发经验，我想如果有机会，我会愿意放弃Java转而从事Go语言的开发。

 回想起来，学语言就是单纯的学语法，学这门语言的类库则像背单词，如果想在写作上有所提高，则需要多看别人写的文章，也就是学框架及其背后的设计思想。软件设计思想更新的太快，编程语言更新的也太快，从类库、框架，到开发平台，再到数据平台，转眼间并没几年的功夫。

 Java已经20年了，同样大的还有JavaScript，PHP，Ruby，Python。我也快30岁了，看着儿子一天天地成长，我常常怀疑自己是否还有时间精力学习不断更新的技术。有时会有些害怕，有时也迷惘。然而我想，这也许就像一把破木吉他，弦松了总是可以调的，枕木脱落也可以再粘，即便它已破碎到无法使用，那些响过的音符也曾经在我脑中荡漾。这不也挺好么。

---

总结归纳研究过的类库、框架等，希望它们不要忘记我曾翻过它们的牌子：
* SpringIoc/SpringAOP
* Hibernate/Mybatis/SpringJDBC
* Struct/SpringMVC/Jersey
* JBPM/Activiti
* Lucene/Elastic Search/Heritrix/IK/Hibernate Search
* Velocity/Jadejs/EJS
* jQuery/Angularjs/Vuejs
* SemanticUI/Bootstrap/Foundation/Extjs
* Express/Loopback/Koajs/Martini
* Grunt/Gulp/Webpack/Bower
* JavaCC/BeanShell

---

预测下编程语言的发展，五年后回来看看自己的技术敏感性如何：

1. Java 持续低迷，在各个领域中不断被替代，然而过程会十分缓慢。应该活不过35岁。JVM会比Java多活几年甚至更久。
2. JavaScript 最多借ES6在Node平台再火两年，然后进入平稳发展期，领域被限制在实时应用及Web服务，依然摆脱不了靠别的语言过活。Angularjs2.0如果成功，jQuery会快速死亡，否则还能在PC端折腾三五年。
3. Ruby 逐渐被排挤出公众视线，当然至少还会存在5年。
4. PHP 僵而不死很多年。和Python、Nodejs分Web市场。
5. Python 不愠不火，平稳发展。毕竟是门设计精良的语言，写脚本也比shell方便，应该不会太快消失。
6. Golang 五年内火速发展起来，然后快速平稳，缓慢进入低迷。五年内总让人觉得Java快不行了，但又绝对不会撼动Java的地位。
7. Rust 未来两年快速发展，也会被一定范围使用。能不能火起来，全看干爹能拿到多少钱。

---

@ssbunny 2015-05-25