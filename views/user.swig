{% extends 'layout.swig' %}

{% block content %}
    <h2>
      <img src="{{ user.avatar }}" alt="avatar" />
      {{ user.personaname }}
    </h2>

    <p>
      <span class="text-success score-main">0</span>.0
      s<span class="text-success">m</span>.
    </p>
{% endblock %}
