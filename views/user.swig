{% extends 'layout.swig' %}

{% block content %}
  <h2>
    <img src="{{ user.avatar }}" alt="avatar" />
    {{ user.personaname }}
  </h2>

  {[{ 1 + 2 }]}
{% endblock %}
