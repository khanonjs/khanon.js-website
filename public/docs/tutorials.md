# What is Khanon.js?

A lo largo de los últimos meses, hemos estado hablando de algunas características del nuevo entorno .NET Framework que Microsoft está desarrollando y a medida que pasaba el tiempo, aquí en Grupo EIDOS, nos hemos ido dividiendo los roles de trabajo, para poder abarcar todo este nuevo paradigma de la programación con la profundidad que se merece. Así pues, tras unos primeros devaneos con Visual Studio, el nuevo Visual Basic .NET y su interfaz de usuario (ver artículo del mes de Abril), cedo los trastos de Visual Basic a mi compañero Luis Miguel Blanco, de sobra conocido por los lectores de Algoritmo y de La Librería Digital, para dedicarme por entero al nuevo lenguaje de programación: C# (C-Sharp).kj

````
<div className={styles['header-button']}>
    <div
      className={ElementStyle.getClass(styles, ['header-button-text', 'font-roadgeek-regular'])}
      onClick={this.handleAPIDoc.bind(this)}
    >
      API Reference
    </div>
    <div className={styles['header-button-icon-containar']}>
    <ExternalLink
      className={styles['header-button-icon']}
      color='black'
      size={30}
    />
  </div>
</div>
````

# How to install Khanon.js

Pretendemos, a lo largo de los próximos meses, ir publicando un curso completo del lenguaje que sirva de introducción a nivel básico-intermedio para los lectores, de forma que, cuando hacia el mes de Noviembre aparezca el producto, ya dispongan de una buena base para poder trabajar y continuar la producción con este lenguaje (como quizá sepa ya el lector, el pasado día 21 de Junio, coincidiendo con el primer evento Tech-Ed del año, celebrado en Atlanta (Georgia), se hizo, por fin pública la beta 2 de Microsoft .NET Framework, así como -para usuarios del MSDN y otros- la beta 2 de Visual Studio .NET. A título personal, tengo fundadas razones para dudar de la demora hasta Febrero/2002, como se ha comentado en algunos foros, y por si esto fuera poco, el Dr.GUI, mentor ficticio del MSDN de Microsoft afirmaba en su 6ª entrega de sus cursos sobre .NET que "a partir del próximo número, todo el código será compatible con la Beta 2 de .NET Framework, puesto que Microsoft no planea ya ningún cambio significativo al API entre la Beta 2 y el producto final, solamente ajustes, optimización y algún cambio de mínima importancia", lo que da idea de lo avanzado del proyecto).

## Add it to your project

El lenguaje C# se presenta como el último invento en materia de lenguajes de programación, y constituye también la más reciente y ambiciosa apuesta en este sentido por parte de Microsoft. Quizás, lo primero que habría que aclarar, es que, de todo el .NET Framework, es la única parte que puede considerarse terminada, hasta el punto de que el propio Visual Studio .NET ha sido construido al 90% en C# y el 10% restante en C++. Por otro lado, el lenguaje merece el calificativo de estándar, en el sentido de que –al igual que algunos otros aspectos del entorno- está siendo sometido a estandarización por parte de ECMA, la misma entidad de normalización que llevó a cabo la estandarización de Javascript.

## Using Khanonjs-cli

Una de las características principales de C# es que se trata de un lenguaje que compila (por defecto) a un formato intermedio, al estilo de Java, denominado Intermediate Language (IL), que posteriormente, debe de ser interpretado por un entorno de ejecución, una máquina JIT (just-in-time), también al estilo de Java. La gran diferencia respecto a Java es que, ése intérprete será común a todos los lenguaje soportados por el entorno de ejecución (veintitantos ya...) y mediante este mecanismo permitirá que los componentes realizados en cualquier lenguaje puedan comunicarse entre sí.

Se trata pues, de una extensión del concepto inicial que dio origen a Java: en lugar de un único lenguaje para muchas plataformas, se pretende un entorno común multiplataforma, que soporte muchos lenguajes, basándose en que todos ellos compilen a un mismo código intermedio. Para hacer viable esta idea, se ha optimizado considerablemente la velocidad, respecto a Java y ya se están anunciando los primeros .NET Framework para otras plataformas: El pasado mes de Marzo, Steve Ballmer anunciaba la disponibilidad para Linux, y están en marcha las implementaciones para Unix, McIntosh System-8 y BEos.

Este lenguaje intermedio, es gestionado por un mecanismo llamado Entorno Común de Ejecución (Common Language Runtime), encargado, además, de la gestión de memoria, y en general, de las tareas más importantes, relacionadas con la ejecución de programas.

# Khanonjs-cli

La segunda línea contiene otra declaración importante. Como se ha indicado, todo el código de un programa en C# debe estar incluido en una clase. Además, en C# no existen métodos ni variables globales, por tanto, mediante la palabra reservada class declaramos la clase HolaMundoCS, que contiene todo el código ejecutable.

Esta clase está compuesta por una única función, que, en éste caso, hace las veces de método constructor y función principal (Main). Dicha función esta precedida de 3 calificadores: de ámbito (public), de acceso (static) y de valor de retorno (void) y es la función principal de todo programa ejecutable en C#. En ella es donde comienza y termina el control del programa y es donde se crean objetos y se ejecutan otros métodos.

## Scaffolding a new project

El lector conoce, sin duda los fundamentos de la programación orientada a objetos, por lo que no creo necesario abundar aquí sobre el tema. Sí parece adecuado, no obstante, abordar la construcción y estudio de las clases siguiendo tales principios fundamentales, que podríamos dividir conceptualmente en dos puntos de vista: el estructural y el funcional.

Entendemos, en el primer caso, aquellos elementos que dan a la clase una arquitectura, y que tradicionalmente, se han subdividido en: campos, métodos, operadores y eventos. En el caso de C#, será necesario además, incluir algunos elementos nuevos que constituyen precisamente las aportaciones más importantes del lenguaje, como son las propiedades (properties), los indizadores (indexers) y los delegados (delegates). Se trata de una división meramente conceptual, ya que estos elementos se traducen a su vez en características del funcionamiento de una clase, y por tanto aportan siempre un componente funcional, a la vez que estructural.

# Development

Los métodos de una clase constituyen su componente funcional, siendo aquello que las dota de un comportamiento. Siguiendo las definiciones formales que aporta el MSDN diremos que un método es “un miembro que implementa un cálculo o una acción que pueden ser realizados por un objeto o una clase. Los métodos tienen una lista de parámetros formales (que puede estar vacía), un valor devuelto (salvo que el tipo de valor devuelto del método sea void), y son estáticos o no estáticos. El acceso a los métodos estáticos se obtiene a través de la clase. El acceso a los métodos no estáticos, también denominados métodos de instancias, se obtiene a través de instancias de la clase”.

Métodos constructores

Recordemos que un método constructor es aquel que se llama siempre que se crea una instancia de una clase. Debe de tener el mismo nombre de la clase, pero admite diferentes signaturas, dependiendo de los distintos conjuntos de parámetros que queramos pasar al constructor. En C# existen 3 tipos de constructores: de instancia, private y static.

Un constructor de instancia se utiliza para crear e inicializar instancias, y es –generalmente- el constructor predeterminado. La sintaxis completa de un constructor de este tipo es:

[atributos] [modificadores] identificador ([lista-de-parámetros-formales]) [inicializador]

# Deploying your project

El editor de Visual Studio .NET se encarga de situar los métodos adecuados de finalización, por lo que no vamos a hacer más hincapié en este punto.