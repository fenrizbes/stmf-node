{% extends 'layout.swig' %}

{% block content %}
  <h1>{{ status }}.</h1>
  <p>{{ message | lower }}.</p>

  {% if stack %}
    <pre>{{ stack }}</pre>
  {% endif %}
{% endblock %}
